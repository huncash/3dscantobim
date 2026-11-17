"""A felső sávos márkalogó kivágása faviconra, fejlécre és borítóra."""
from pathlib import Path
import base64
import math

from PIL import Image

SRC = Path(
    r"C:\Users\patri\.cursor\projects\c-Users-patri-DEVELOPMENT-dev-site-7-newdew"
    r"\assets\Gemini_Generated_Image_q2a2z9q2a2z9q2a2-600ec953-6ad9-4341-91a2-6e54d1298de6.jpg"
)
ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SHEET = (247, 249, 251, 255)


def luminance(pixel):
    return (pixel[0] + pixel[1] + pixel[2]) / 3


def content_box(image, limit=175, y_max=None):
    pixels = image.load()
    width, height = image.size
    bottom = height if y_max is None else min(height, y_max)
    min_x, min_y, max_x, max_y = width, bottom, 0, 0
    found = False
    for y in range(bottom):
        for x in range(width):
            if luminance(pixels[x, y]) < limit:
                found = True
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)
    if not found:
        raise SystemExit("A logó nem található a felső sávban.")
    return min_x, min_y, max_x + 1, max_y + 1


def sample_background(image):
    pixels = image.load()
    width, height = image.size
    points = [(4, 4), (width - 5, 4), (4, height - 5), (width // 2, 4)]
    total = [0, 0, 0]
    for x, y in points:
        pixel = pixels[x, y]
        total[0] += pixel[0]
        total[1] += pixel[1]
        total[2] += pixel[2]
    return tuple(channel // len(points) for channel in total)


def knock_out(image, background, low=24, high=58):
    result = image.convert("RGBA")
    pixels = result.load()
    width, height = result.size
    for y in range(height):
        for x in range(width):
            red, green, blue, _alpha = pixels[x, y]
            distance = math.dist((red, green, blue), background)
            if distance <= low:
                pixels[x, y] = (red, green, blue, 0)
            elif distance < high:
                mix = (distance - low) / (high - low)
                pixels[x, y] = (red, green, blue, int(255 * mix))
    return result


def alpha_box(image, threshold=20):
    pixels = image.load()
    width, height = image.size
    min_x, min_y, max_x, max_y = width, height, 0, 0
    found = False
    for y in range(height):
        for x in range(width):
            if pixels[x, y][3] > threshold:
                found = True
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)
    if not found:
        raise SystemExit("A kivágott logónak nincs látható pixele.")
    return min_x, min_y, max_x + 1, max_y + 1


def trim(image, pad=0):
    left, top, right, bottom = alpha_box(image)
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(image.width, right + pad)
    bottom = min(image.height, bottom + pad)
    return image.crop((left, top, right, bottom))


def mark_from_lockup(lockup):
    pixels = lockup.load()
    columns = []
    for x in range(lockup.width):
        ink = sum(1 for y in range(lockup.height) if pixels[x, y][3] > 30)
        columns.append(ink > 4)
    gaps = []
    start = None
    for x, filled in enumerate(columns + [True]):
        if not filled and start is None:
            start = x
        elif filled and start is not None:
            gaps.append((start, x - start))
            start = None
    split = None
    for gap_start, gap_width in gaps:
        if gap_start > lockup.width * 0.12 and gap_width > 12:
            split = gap_start
            break
    if split is None:
        split = int(lockup.width * 0.28)
    return trim(lockup.crop((0, 0, split, lockup.height)), pad=0)


def square_icon(mark, size, background=SHEET):
    side = max(mark.width, mark.height)
    padded = int(side * 1.34)
    tile = Image.new("RGBA", (padded, padded), background)
    tile.paste(mark, ((padded - mark.width) // 2, (padded - mark.height) // 2), mark)
    return tile.resize((size, size), Image.Resampling.LANCZOS)


def cover(lockup):
    canvas = Image.new("RGB", (1200, 630), (238, 243, 244))
    target_width = 860
    target_height = round(lockup.height * (target_width / lockup.width))
    resized = lockup.resize((target_width, target_height), Image.Resampling.LANCZOS)
    x = (canvas.width - target_width) // 2
    y = (canvas.height - target_height) // 2
    canvas.paste(resized, (x, y), resized)
    return canvas


def main():
    source = Image.open(SRC).convert("RGB")
    band = source.crop((0, 0, source.width, 360))
    left, top, right, bottom = content_box(band)
    pad = 18
    lockup = band.crop((
        max(0, left - pad),
        max(0, top - pad),
        min(band.width, right + pad),
        min(band.height, bottom + pad),
    ))
    keyed = trim(knock_out(lockup, sample_background(lockup)), pad=2)
    images = PUBLIC / "images"
    images.mkdir(parents=True, exist_ok=True)
    logo_path = images / "logo.png"
    keyed.save(logo_path)

    mark = mark_from_lockup(keyed)
    sizes = {
        16: PUBLIC / "favicon-16.png",
        32: PUBLIC / "favicon-32.png",
        48: PUBLIC / "favicon-48.png",
        180: PUBLIC / "apple-touch-icon.png",
        192: PUBLIC / "icon-192.png",
        512: PUBLIC / "icon-512.png",
    }
    icons = {size: square_icon(mark, size) for size in sizes}
    for size, path in sizes.items():
        icons[size].save(path)
    icons[48].save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[icons[16], icons[32]],
    )
    encoded = base64.b64encode((PUBLIC / "icon-192.png").read_bytes()).decode("ascii")
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">'
        f'<image width="192" height="192" href="data:image/png;base64,{encoded}"/>'
        "</svg>\n"
    )
    (PUBLIC / "favicon.svg").write_text(svg, encoding="utf-8")
    cover(keyed).save(images / "og.png")
    print(f"logo {keyed.size}")
    print(f"mark {mark.size}")


if __name__ == "__main__":
    main()
