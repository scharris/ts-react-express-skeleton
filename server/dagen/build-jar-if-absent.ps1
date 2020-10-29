$scriptDir = $PSScriptRoot

function New-TempDir
{
    $parent = [System.IO.Path]::GetTempPath()
    [string] $name = [System.Guid]::NewGuid()
    New-Item -ItemType Directory -Path (Join-Path $parent $name)
}

if ( -Not (Test-Path -Path $scriptDir/dagen.jar -PathType Leaf) )
{
    Write-Host "Building dagen."

    $buildDir = New-TempDir
    
    Write-Host "Building in directory $buildDir."

    git clone https://github.com/scharris/dagen.git $buildDir
    cmd.exe /c "cd $buildDir && mvn -DskipTests package"

    Copy-Item $buildDir/target/dagen.jar $scriptDir/

    Remove-item -Recurse $buildDir -Force
}
else
{
    Write-Host "The dagen jar already exists, skipping its build."
}
