import SimpleImageSlider from "react-simple-image-slider";

export default function Slider() {
  const imageLinks = [
    { url: "https://wallpapercave.com/wp/wp3137839.jpg" },
    { url: "https://foro.geeknetic.es/filedata/fetch?id=220615&d=1598015914" },
    {
      url: "https://wallpapersmug.com/download/3840x2160/11a3dc/firewatch-game-sunset-artwork.jpg",
    },
    { url: "https://cdn.wallpapersafari.com/37/36/4UgH0k.jpg" },
  ];

  const [images, setImages] = useState([]);
  const a = useContext(UserContext);
  const [count, setCount] = useState(0);

  const ImagesLoad = async () => {
    if (count < 2) {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/GalleryImages`
      );

      var list = [];
      try {
        const docSnap = await getDocs(docRef);
        docSnap.forEach((doc) => {
          list.push(doc.data());
        });
        setImages(list);
        setCount(count + 1);
      } catch (e) {
        alert(e);
      }
    }
  };

  return (
    <div style={{ position: "relative", left: 0, top: 0, zindex: -1 }}>
      <SimpleImageSlider
        width={"100%"}
        height={504}
        images={imageLinks}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
}
