import useFindPost from "5_shared/hooks/useFindPost";
import { CREATE_ROUTE, EDIT_ROUTE, ERROR_ROUTE } from "5_shared/router/paths";
import { Navigate, useParams } from "react-router-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
//import style from "./PostPage.module.scss";
import "./PostPage.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Keyboard } from "swiper/modules";
import { Image } from "5_shared/models";
import getSeparatedTextArray from "5_shared/helpers/getSeparatedTextArray";
import { useState } from "react";
import useAdmin from "5_shared/hooks/useAdmin";
import { Button } from "@mui/material";

export const PostPage: React.FC = () => {
  const isAdmin = useAdmin();
  const { id } = useParams();
  const post = useFindPost(id ?? "");
  const desc: string[] = getSeparatedTextArray(post?.description ?? "");

  //console.log(post);

  const [slideIndex, setSlideIndex] = useState(0);
  const handleSlideChange = (swiper: { activeIndex: number }) => {
    setSlideIndex(swiper.activeIndex);
  };

  if (!post) return <Navigate to={ERROR_ROUTE} replace={true} />;

  return (
    <div className="max-width">
      <Swiper
        initialSlide={slideIndex}
        onSlideChange={handleSlideChange}
        className="swiper-container"
        effect={"fade"}
        //loop={true}
        keyboard={{
          enabled: true,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Keyboard]}
        spaceBetween={0}
        slidesPerView={1}
      >
        {post?.images.map((img: Image, index: number) => (
          <SwiperSlide key={index}>
            <img
              className="swiper-slide_img"
              src={img.url as string}
              alt={img.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {isAdmin && (
        <Link to={`${EDIT_ROUTE}/${post.id}`}>
          <Button variant="contained" color="primary">
            Edit
          </Button>
        </Link>
      )}

      <h2 className="post-title">{post.title}</h2>
      <span className="post-description">{desc[slideIndex]}</span>
    </div>
  );
};
