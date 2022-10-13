#/bin/sh

redis-cli GET planet_capital_database_security_ratios_$1|jq 'to_entries|.[]|select(.key|contains("Ratio"))'
