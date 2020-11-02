param ([Parameter(Mandatory)] $DagenVersion)
$ErrorActionPreference = 'Stop'; Set-StrictMode -Version Latest

$scriptDir = $PSScriptRoot
$dagenRepoUrl = "https://github.com/scharris/dagen.git"
$jarName = "dagen-$DagenVersion.jar"

function New-TempDir
{
    $dirPath = Join-Path ([System.IO.Path]::GetTempPath()) ([System.Guid]::NewGuid().ToString())
    New-Item -ItemType Directory -Path $dirPath
}

if ( -Not (Test-Path -Path $scriptDir/$jarName -PathType Leaf) )
{
    Write-Information "Building dagen."

    Remove-item $scriptDir/*.jar

    $buildDir = New-TempDir

    Write-Information "Building in directory $buildDir."

    git clone --depth 1 --branch $DagenVersion  $dagenRepoUrl $buildDir

    cmd.exe /c "cd $buildDir && mvn -DskipTests package"

    Copy-Item $buildDir/target/dagen.jar $scriptDir/$jarName

    Remove-item -Recurse $buildDir -Force
}
else
{
    Write-Information "The dagen jar already exists, skipping its build."
}
