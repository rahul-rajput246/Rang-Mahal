Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class FastLogoProcessor {
    public static void ProcessLogo(string srcPath, string outPathMain, string outPathLight) {
        using (Bitmap src = new Bitmap(srcPath)) {
            int w = src.Width;
            int h = src.Height;

            int minX = 182;
            int maxX = 1193;
            int minY = 218;
            int maxY = 549;

            int pad = 15;
            int cropX = Math.Max(0, minX - pad);
            int cropY = Math.Max(0, minY - pad);
            int cropW = Math.Min(w - cropX, (maxX - minX) + (pad * 2));
            int cropH = Math.Min(h - cropY, (maxY - minY) + (pad * 2));

            Rectangle cropRect = new Rectangle(cropX, cropY, cropW, cropH);
            using (Bitmap cropped = src.Clone(cropRect, PixelFormat.Format32bppArgb)) {
                using (Bitmap lightBmp = new Bitmap(cropW, cropH, PixelFormat.Format32bppArgb)) {
                    BitmapData data = cropped.LockBits(new Rectangle(0, 0, cropW, cropH), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
                    BitmapData lightData = lightBmp.LockBits(new Rectangle(0, 0, cropW, cropH), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);

                    int pixelCount = cropW * cropH;
                    int[] pixels = new int[pixelCount];
                    int[] lightPixels = new int[pixelCount];

                    Marshal.Copy(data.Scan0, pixels, 0, pixelCount);

                    for (int i = 0; i < pixelCount; i++) {
                        uint argb = (uint)pixels[i];
                        uint b = argb & 0xFF;
                        uint g = (argb >> 8) & 0xFF;
                        uint r = (argb >> 16) & 0xFF;

                        double brightness = (r * 0.299 + g * 0.587 + b * 0.114);

                        if (brightness >= 246) {
                            pixels[i] = 0;
                            lightPixels[i] = 0;
                        } else if (brightness >= 225) {
                            double factor = (246.0 - brightness) / 21.0;
                            uint alpha = (uint)(255 * factor);
                            pixels[i] = (int)((alpha << 24) | (r << 16) | (g << 8) | b);

                            uint lr = (uint)Math.Min(255, (int)(r * 1.35 + 20));
                            uint lg = (uint)Math.Min(255, (int)(g * 1.35 + 20));
                            uint lb = (uint)Math.Min(255, (int)(b * 1.35 + 20));
                            lightPixels[i] = (int)((alpha << 24) | (lr << 16) | (lg << 8) | lb);
                        } else {
                            pixels[i] = (int)((255u << 24) | (r << 16) | (g << 8) | b);

                            uint lr = (uint)Math.Min(255, (int)(r * 1.35 + 25));
                            uint lg = (uint)Math.Min(255, (int)(g * 1.35 + 25));
                            uint lb = (uint)Math.Min(255, (int)(b * 1.35 + 25));
                            lightPixels[i] = (int)((255u << 24) | (lr << 16) | (lg << 8) | lb);
                        }
                    }

                    Marshal.Copy(pixels, 0, data.Scan0, pixelCount);
                    Marshal.Copy(lightPixels, 0, lightData.Scan0, pixelCount);

                    cropped.UnlockBits(data);
                    lightBmp.UnlockBits(lightData);

                    cropped.Save(outPathMain, ImageFormat.Png);
                    lightBmp.Save(outPathLight, ImageFormat.Png);
                }
            }
        }
    }
}
"@ -ReferencedAssemblies System.Drawing

$srcPath = "C:\Users\Dell\.gemini\antigravity-ide\brain\f48a8c4c-c4b5-4f59-ab37-120518939284\rang_mahal_logo_1792426706921.jpg"
$rootDir = Split-Path -Parent $PSScriptRoot

$outLogo = Join-Path $rootDir "assets\img\logo\rang-mahal-logo.png"
$outLogoLight = Join-Path $rootDir "assets\img\logo\rang-mahal-logo-light.png"

[FastLogoProcessor]::ProcessLogo($srcPath, $outLogo, $outLogoLight)
Write-Host "Processed images successfully!"

# Overwrite logo files
$targets = @(
    "assets\img\logo\logo.png",
    "assets\img\logo\main-logo.png",
    "assets\img\logo\logo2.png",
    "assets\img\logo\logo3.png",
    "assets\img\home-8\logo.png",
    "assets\img\home-2\foodie-logo.png"
)

foreach ($t in $targets) {
    $dest = Join-Path $rootDir $t
    Copy-Item -Path $outLogo -Destination $dest -Force
    Write-Host "Updated: $t"
}

# Overwrite footer logo files with light version
$footerTargets = @(
    "assets\img\home-1\footer-logo.png",
    "assets\img\home-4\footer-logo.png",
    "assets\img\home-5\footer-logo.png",
    "assets\img\home-6\footer-logo.png",
    "assets\img\home-8\footer-logo.png",
    "assets\img\home-10\footer-logo.png",
    "assets\img\home-11\footer-logo.png"
)

foreach ($ft in $footerTargets) {
    $dest = Join-Path $rootDir $ft
    Copy-Item -Path $outLogoLight -Destination $dest -Force
    Write-Host "Updated footer logo: $ft"
}

Write-Host "All logo files updated successfully!"
