param ([Parameter(Mandatory)] $DagenVersion)
$ErrorActionPreference = 'Stop'; Set-StrictMode -Version Latest

$props = "$PSScriptRoot/dbmd.props"
$output = "$PSScriptRoot/dbmd.yml"
$libDir = "$PSScriptRoot/../lib"

& "$libDir/build-jar-if-absent" $DagenVersion

$JAR="$libDir/dagen-$DagenVersion.jar"

Write-Output "Generating database metadata."

java -cp $JAR org.sqljson.DatabaseMetadataMain $props $props $output
