# Gera as imagens PNG da identidade visual (Open Graph e ícone Apple)
# Uso (Windows PowerShell):  powershell -ExecutionPolicy Bypass -File scripts\gerar-imagens.ps1
# Arte 100% original: selo quadrado com a letra "E" em pinceladas.
param(
  [string]$Titulo = 'Elysium Wiki',
  [string]$Subtitulo = 'O guia do jogador: jutsus, personagens, missões e muito mais'
)
Add-Type -AssemblyName System.Drawing
$pub = Join-Path $PSScriptRoot '..\public'

function New-Seal([System.Drawing.Graphics]$g, [float]$x, [float]$y, [float]$s) {
  $rect = New-Object System.Drawing.RectangleF($x, $y, $s, $s)
  $r = $s * 0.22
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc($x, $y, $r, $r, 180, 90); $path.AddArc($x + $s - $r, $y, $r, $r, 270, 90)
  $path.AddArc($x + $s - $r, $y + $s - $r, $r, $r, 0, 90); $path.AddArc($x, $y + $s - $r, $r, $r, 90, 90)
  $path.CloseFigure()
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(217, 72, 42), [System.Drawing.Color]::FromArgb(143, 36, 18), 45)
  $g.FillPath($brush, $path)
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(251, 243, 230), [float]($s * 0.08))
  $pen.StartCap = 'Round'; $pen.EndCap = 'Round'
  $u = $s / 64
  $g.DrawBezier($pen, $x + 22*$u, $y + 18*$u, $x + 30*$u, $y + 16.5*$u, $x + 38*$u, $y + 16.5*$u, $x + 44*$u, $y + 17.5*$u)
  $g.DrawBezier($pen, $x + 23*$u, $y + 18*$u, $x + 22*$u, $y + 27*$u, $x + 22.5*$u, $y + 37*$u, $x + 23.5*$u, $y + 46*$u)
  $g.DrawBezier($pen, $x + 24*$u, $y + 32*$u, $x + 30*$u, $y + 31*$u, $x + 35*$u, $y + 31*$u, $x + 40*$u, $y + 32*$u)
  $g.DrawBezier($pen, $x + 24*$u, $y + 46*$u, $x + 31*$u, $y + 47*$u, $x + 38*$u, $y + 47*$u, $x + 45*$u, $y + 45.5*$u)
}

# ---------- Open Graph 1200x630 ----------
$bmp = New-Object System.Drawing.Bitmap(1200, 630)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'AntiAliasGridFit'
$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.Rectangle(0, 0, 1200, 630)), [System.Drawing.Color]::FromArgb(22, 17, 14), [System.Drawing.Color]::FromArgb(77, 23, 12), 30)
$g.FillRectangle($bg, 0, 0, 1200, 630)
# ondas decorativas
$wave = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(28, 248, 236, 220), 2)
for ($yy = 0; $yy -lt 700; $yy += 36) { for ($xx = 520; $xx -lt 1260; $xx += 72) { foreach ($rr in 36, 24, 12) { $g.DrawArc($wave, $xx - $rr, $yy - $rr, $rr * 2, $rr * 2, 180, 180) } } }
New-Seal $g 84 150 150
$fTitle = New-Object System.Drawing.Font('Palatino Linotype', 72, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fSub = New-Object System.Drawing.Font('Segoe UI', 32, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$fTag = New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString('WIKI DO JOGADOR', $fTag, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 141, 102))), 84, 340)
$g.DrawString($Titulo, $fTitle, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 246, 234))), 78, 372)
$g.DrawString($Subtitulo, $fSub, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(236, 220, 198))), (New-Object System.Drawing.RectangleF(84, 470, 1030, 120)))
$bmp.Save((Join-Path $pub 'og-image.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()

# ---------- apple-touch-icon 180x180 ----------
$ico = New-Object System.Drawing.Bitmap(180, 180)
$g2 = [System.Drawing.Graphics]::FromImage($ico)
$g2.SmoothingMode = 'AntiAlias'
$g2.Clear([System.Drawing.Color]::FromArgb(245, 239, 228))
New-Seal $g2 10 10 160
$ico.Save((Join-Path $pub 'apple-touch-icon.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g2.Dispose(); $ico.Dispose()
Write-Output 'Imagens geradas em public/: og-image.png, apple-touch-icon.png'
