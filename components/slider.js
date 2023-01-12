import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "https://wallpapercave.com/wp/wp3137839.jpg" },
  { url: "https://foro.geeknetic.es/filedata/fetch?id=220615&d=1598015914" },
  { url: "https://wallpapersmug.com/download/3840x2160/11a3dc/firewatch-game-sunset-artwork.jpg" },
  { url: "https://cdn.wallpapersafari.com/37/36/4UgH0k.jpg" },
];

export default function Slider () {
  return (
    <div style={{position: 'relative',
        left: 0,
        top: 0,
        zindex: -1}}>
      <SimpleImageSlider
        width={"100%"}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
}