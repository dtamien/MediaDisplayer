# Description

I developed a media displayer specifically for my parents to use at their shop. They needed a way to showcase numerous ads on a screen, so I created this solution for them.

![Media Displayer System](sneak-peek.png)

# Media side

Photos and videos are displayed in a loop. A photo stays on the screen for 10 seconds, and a video plays until its end before the next media is displayed.

# Information side

The current date and time, information on the weather at the store's location and a QR code are displayed. The QR code links to the store's Facebook page.

# Command to run the system

```bash
pip3 install -r requirements.txt && \
yarn && \
python3 process_media_directory.py \
    --src-dir /Users/dtamien/Desktop/À\ la\ diffusion \
    --dest-dir /Users/dtamien/Documents/GITHUB/media-displayer/dist && \
cd /Users/dtamien/Documents/GITHUB/media-displayer/dist && \
serve -p 29870 && \
firefox http://localhost:29870

```