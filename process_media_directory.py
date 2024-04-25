import argparse
import os
import json
from PIL import Image
from moviepy.editor import VideoFileClip
from multiprocessing import Pool
from tqdm import tqdm

def process_media(file_path):
    try:
        if file_path.lower().endswith(('.png', '.jpg', '.jpeg')):
            img = Image.open(file_path)
            width = img.width
            height = img.height
            media_type = 'image'
        elif file_path.lower().endswith(('.mp4', '.avi', '.mov')):
            video_clip = VideoFileClip(file_path)
            width = video_clip.size[0]
            height = video_clip.size[1]
            media_type = 'video'
        
        if height >= width:
            style = 'width: auto; height: 100%;'
        else:
            style = 'width: 100%; height: auto;'
                
        return {
            'type': media_type,
            'path': os.path.join("/media", os.path.basename(file_path)),
            'style': style
        }
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return None


def process_wrapper(args):
    return process_media(*args)


def main(src_dir, dest_dir):
    media_symlink_path = os.path.join(dest_dir, "media")
    if os.path.islink(media_symlink_path):
        os.remove(media_symlink_path)
    os.symlink(src_dir, media_symlink_path)

    media_info = []
    file_paths = [entry.path for entry in os.scandir(src_dir) if entry.is_file() and not entry.name.startswith('.')]

    with Pool() as pool, tqdm(total=len(file_paths), unit="media") as pbar:
        for result in pool.imap_unordered(process_wrapper, [(file_path, dest_dir) for file_path in file_paths]):
            if result:
                media_info.append(result)
            pbar.update()

    with open(os.path.join(dest_dir, "media.json"), 'w') as f:
        json.dump(media_info, f, indent=4)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--src-dir', dest='src_dir', type=str, required=True)
    parser.add_argument('--dest-dir', dest='dest_dir', type=str, required=True)
    args = parser.parse_args()
    
    main(args.src_dir, args.dest_dir)
