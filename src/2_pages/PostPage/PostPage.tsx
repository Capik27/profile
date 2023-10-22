import useFindPost from "5_shared/hooks/useFindPost";
import { ERROR_ROUTE } from "5_shared/router/paths";
import { Navigate, useParams } from "react-router-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
//import style from "./PostPage.module.scss";
import "./PostPage.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Image } from "5_shared/models";

export const PostPage: React.FC = () => {
  const { id } = useParams();
  const post = useFindPost(id ?? "");

  console.log(post);

  if (!post) return <Navigate to={ERROR_ROUTE} replace={true} />;
  //controls
  return (
    <div className="max-width">
      <Swiper
        effect={"fade"}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper: any) => console.log(swiper)}
      >
        {post?.images.map((img: Image, index: number) => (
          <SwiperSlide key={index}>
            <img
              className="swiper-slide_img"
              // className={style.img}
              src={img.url as string}
              alt={img.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div>{post.title}</div>
      <div>{post.description}</div>
    </div>
  );
};
