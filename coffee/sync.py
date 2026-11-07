#!/usr/bin/env python3
import os
import sys
import json
import time

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
THUMBS_DIR = os.path.join(BASE_DIR, "thumbs")
FILES_JSON = os.path.join(BASE_DIR, "files.json")
FILES_JS = os.path.join(BASE_DIR, "files.js")
INODE_MAP_FILE = os.path.join(THUMBS_DIR, ".inodes.json")


def sync_once():
    os.makedirs(THUMBS_DIR, exist_ok=True)

    inode_map = {}
    if os.path.exists(INODE_MAP_FILE):
        try:
            with open(INODE_MAP_FILE, "r", encoding="utf-8") as f:
                inode_map = json.load(f)
        except Exception:
            inode_map = {}

    files = sorted(f for f in os.listdir(DATA_DIR) if not f.startswith("."))
    current_thumbs = set()
    new_inode_map = {}

    for fname in files:
        ext = fname.rsplit(".", 1)[-1].lower() if "." in fname else ""
        if ext not in ("heic", "heif"):
            continue

        src = os.path.join(DATA_DIR, fname)
        dst_name = fname + ".jpg"
        dst = os.path.join(THUMBS_DIR, dst_name)
        current_thumbs.add(dst_name)

        try:
            st = os.stat(src)
            inode_key = f"{st.st_ino}_{st.st_size}"
        except OSError:
            continue

        new_inode_map[inode_key] = dst_name

        # Nếu file vừa được đổi tên từ file cũ cùng inode, đổi tên luôn file thumb (cực nhanh)
        if not os.path.exists(dst) and inode_key in inode_map:
            old_dst = os.path.join(THUMBS_DIR, inode_map[inode_key])
            if os.path.exists(old_dst):
                try:
                    os.rename(old_dst, dst)
                except OSError:
                    pass

        # Nếu chưa có thumb thì giải mã từ HEIC sang JPG
        if not os.path.exists(dst):
            try:
                import gi
                gi.require_version("GdkPixbuf", "2.0")
                from gi.repository import GdkPixbuf

                pb = GdkPixbuf.Pixbuf.new_from_file_at_scale(src, 900, 900, True)
                pb = pb.apply_embedded_orientation()
                pb.savev(dst, "jpeg", ["quality"], ["82"])
            except Exception as e:
                print(f"Lỗi tạo thumb cho {fname}: {e}")

    # Xóa các thumb cũ không còn trong data/
    for existing in os.listdir(THUMBS_DIR):
        if existing.startswith("."):
            continue
        if existing not in current_thumbs:
            try:
                os.remove(os.path.join(THUMBS_DIR, existing))
            except OSError:
                pass

    with open(INODE_MAP_FILE, "w", encoding="utf-8") as f:
        json.dump(new_inode_map, f, ensure_ascii=False, indent=2)

    with open(FILES_JSON, "w", encoding="utf-8") as f:
        json.dump(files, f, ensure_ascii=False, indent=2)

    js_content = "window.COFFEE_FILES = " + json.dumps(files, ensure_ascii=False, indent=2) + ";\n"
    with open(FILES_JS, "w", encoding="utf-8") as f:
        f.write(js_content)


def watch():
    print("Đang theo dõi thư mục data/ để tự động cập nhật khi đổi tên file...")
    last_snapshot = None
    while True:
        try:
            files = sorted(f for f in os.listdir(DATA_DIR) if not f.startswith("."))
            if files != last_snapshot:
                sync_once()
                last_snapshot = files
        except Exception as e:
            print("Watch error:", e)
        time.sleep(1.0)


if __name__ == "__main__":
    if "--watch" in sys.argv:
        watch()
    else:
        sync_once()
