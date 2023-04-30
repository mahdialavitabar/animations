import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import star from "../Assets/gold-star-icon.svg";
import { toFarsiNumber } from "../Utils/useNumberToPersian";

type Review = {
  id: number;
  reviewsTitle: string;
  reviewsRate: number;
  reviewsThumbnailUrl: string;
};

const Animations = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("selected");
  const history = useNavigate();
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://kodoumo.ir/wp-json/api/v2/reviews-category/animations?page=${page}&sortby=${sortBy}`
      );
      setReviews((prevReviews) => [...prevReviews, ...response.data.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page, sortBy]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const handleSortByChange = (event: any) => {
    setSortBy(event.target.value);
    setPage(1);
    setReviews([]);
  };
  const handleGoBack = () => {
    history(-1);
  };
  // const handleLoadMore = () => {
  //   setPage((prevPage) => prevPage + 1);
  // };

  return (
    <div
      className="max-w-[480px] p-4"
      style={{ maxWidth: "480px", margin: "auto" }}
    >
      <div
        onClick={handleGoBack}
        className="border border-black rounded-lg p-1 shadow-lg w-20 text-center cursor-pointer"
      >
        <p>بازگشت</p>
      </div>
      <div className="flex justify-between m-4 ">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-2xl">چیارو ببینه؟</p>
          </div>
          <div className="text-slate-500"> مناسب برای ۳ تا ۷ سال</div>
        </div>
        <div dir="rtl" className="flex gap-4 items-center">
          <select
            value={sortBy}
            onChange={handleSortByChange}
            className="border border-black rounded-lg"
          >
            <option
              value="selected"
              defaultChecked={true}
              disabled
              selected={true}
            >
              مرتب سازی
            </option>
            <option value="newest">تازه ترین</option>
            <option value="view">بازدید </option>
            <option value="rate">امتیاز</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 text-center text-sm ">
        {reviews.map((review: any) => (
          <div key={review.id} className="review-card">
            <img
              src={review.reviewsThumbnailUrl}
              className="rounded-lg shadow-lg"
            />
            <div className="mt-4">{review.reviewsTitle}</div>
            <div className="flex gap-2 my-2 items-center">
              <img src={star} className="w-4" />
              <div> {toFarsiNumber(review.reviewsRate)}</div>
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="mx-auto bg-orange-400 py-2 px-4 w-40 text-center text-white rounded-lg shadow-lg">
          در حال بارگذاری
        </div>
      )}
      {/* {!loading && (
        <button onClick={handleLoadMore} className="bg-black text-white">
          بیشتر...
        </button>
      )} */}
    </div>
  );
};

export default Animations;
