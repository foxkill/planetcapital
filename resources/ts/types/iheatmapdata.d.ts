//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import { HeatMapDatum, HeatMapSerie } from "@nivo/heatmap";

interface PlanetHeatMapDatum extends HeatMapDatum {
    value: number
}

interface PlanetHeatMapExtraProps {
    key: string
}

declare interface IHeatmapData extends HeatMapSerie<PlanetHeatMapDatum, PlanetHeatMapExtraProps> {
}