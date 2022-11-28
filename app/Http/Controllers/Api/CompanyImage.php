<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use RuntimeException;

class CompanyImage extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        list($image, $contentType, $responseCode) = $this->loadCompanyImage($request);

        if (!empty($image)) {
            return response($image, $responseCode)->header('Content-Type', $contentType);
        }

        throw new RuntimeException('Corporate logo could not be loaded');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Return the cache key for the company profile.
     * 
     * @return string
     */
    private function getProfileKey(Request $request)
    {
        return join('_', ['security', 'profile', strtolower($request->exchange), strtolower($request->security)]);
    }

    /**
     * Return the cache key for the company image.
     */
    private function getCompanyImageKey($request)
    {
        return join('_', ['security', 'image', strtolower($request->exchange), strtolower($request->security)]);
    }

    /**
     * Load the company logo from the cache.
     */
    private function loadImageFromCache(Request $request)
    {
        // The cached image is in the format:
        // data:image/png;base64,imagedatabase64

        $imageData = Cache::get($this->getCompanyImageKey($request));
        if (!$imageData) {
            return ['', ''];
        }

        list($baseHeader, $image) = explode(',', $imageData);
        list($imageHeader) = explode(';', $baseHeader);

        $contentType = str_replace('data:', '', $imageHeader);

        return [base64_decode($image), $contentType, 200];
    }

    private function storeImageInCache($request, $image, $contentType)
    {
        $imageKey = $this->getCompanyImageKey($request);

        $payload = 'data:' . $contentType . ',' . base64_encode($image);

        Cache::put($imageKey, $payload);
    }

    private function getCompanyProfile($request)
    {
        $profileKey = $this->getProfileKey($request);

        $cachedProfile = Cache::get($profileKey);

        // We have a stored Profile.
        if (isset($cachedProfile)) {
            // Return an decoded array.
            return json_decode($cachedProfile, true);
        }

        $endpoint = sprintf(FMP_PROFILE, $request->security, env('FMP_API_KEY'));
        $response = Http::get($endpoint);

        if (!$response->ok()) {
            $response->throw()->json();
        }

        $profile = $response->json();
        if (!$profile) {
            throw new RuntimeException('Could not decode company profile');
        }

        // Store the profile
        Cache::put($profileKey, json_encode($profile));

        return $profile;
    }


    /**
     * Load the corporate logo either from cache or from
     * the profile image url.
     * 
     * @return array
     */
    private function loadCompanyImage(Request $request)
    {
        // First try to load the image from the cache.
        list($image, $contentType) = $this->loadImageFromCache($request);

        if (!empty($image)) {
            return [$image, $contentType, 200];
        }

        // We have no cached image. 
        // Load the profile first to extract the image url.
        $profile = $this->getCompanyProfile($request);
        $imageUrl = $profile[0]['image'];

        $response = Http::get($imageUrl);
        if (!$response->ok()) {
            $response->throw()->json();
        }

        $imageData = $this->scaleImage($response->body(), 256, 256);

        $this->storeImageInCache($request, $imageData[0], $imageData[1]);

        array_push($imageData, 201);

        return $imageData;
    }

    /**
     * Resize the image to a defined size.
     * 
     * @return array
     */
    private function scaleImage($blob, $newWidth, $newHeight)
    {
        // $a = getimagesizefromstring($blob);
        list($width, $height, $image_type) = getimagesizefromstring($blob);

        $aspectRatio = $width / $height;

        // Get the optimal Image dimensions
        $optimalWidth  = round($aspectRatio >= 1 ? $newWidth : ($aspectRatio * $newHeight));
        $optimalHeight = round($aspectRatio <= 1 ? $newHeight : ($newWidth / $aspectRatio));

        // Keep the minimum of the new dimensions
        if ($minDimensions = false) {
            $heightRatio = $height / $newHeight;
            $widthRatio = $width / $newWidth;

            if ($heightRatio < $widthRatio) {
                $optimalRatio = $heightRatio;
            } else {
                $optimalRatio = $widthRatio;
            }

            $optimalWidth = $width / $optimalRatio;
            $optimalHeight = $height / $optimalRatio;
        }

        $src = imagecreatefromstring($blob);
        $tmp = imagecreatetruecolor($optimalWidth, $optimalHeight);
        /* Check if this image is PNG or GIF, then set if Transparent*/
        if (($image_type == 1) or ($image_type == 3)) {
            imagealphablending($tmp, false);
            imagesavealpha($tmp, true);
            $transparent = imagecolorallocatealpha($tmp, 255, 255, 255, 127);
            imagefilledrectangle($tmp, 0, 0, $optimalWidth, $optimalHeight, $transparent);
        }

        imagecopyresampled($tmp, $src, 0, 0, 0, 0, $optimalWidth, $optimalHeight, $width, $height);

        ob_start();
        switch ($image_type) {
            case 1:
                imagegif($tmp);
                $contentType = 'image/gif';
                break;
            case 2:
                imagejpeg($tmp, NULL, 100);
                $contentType = 'image/jpeg';
                break; // best quality
            case 3:
                imagepng($tmp, NULL, 0);
                $contentType = 'image/png';
                break; // no compression
            default:
                echo '';
                break;
        }

        $final_image = ob_get_contents();
        ob_end_clean();

        imagedestroy($src);
        imagedestroy($tmp);

        return [$final_image, $contentType];
    }
}
