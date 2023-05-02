import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import star from "../Assets/gold-star-icon.svg";
import { toFarsiNumber } from "../Utils/useNumberToPersian";

const Animations = () => {
  const [items, setItems] = useState([]);
  const [metaData, setMetaData] = useState({
    pageDescription: "",
    pageTitle: "",
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [sort, setSort] = useState("newest");
  const history = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleChangeSort = (sort: any) => {
    setSort(sort);
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://kodoumo.ir/wp-json/api/v2/reviews-category/animations?page=${page}&sortby=${sort}`
      );
      const { pageDescription, pageTitle } = response.data;
      setMetaData({ pageDescription: pageDescription, pageTitle: pageTitle });
      setItems((prevReviews) =>
        page === 1
          ? response.data.data
          : [...prevReviews, ...response.data.data]
      );
      console.log(response);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
    console.log(sort);
  }, [page, sort]);

  useEffect(() => {
    setPage(1);
  }, [sort]);

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

  const handleGoBack = () => {
    history(-1);
  };

  return (
    <div
      className="max-w-[480px] p-4 border border-gray-300  shadow-2xl"
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
            <p className="text-2xl">{metaData.pageTitle}</p>
          </div>
          <div className="text-slate-500">{metaData.pageDescription}</div>
        </div>
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            contentLabel="Example Modal"
            className="fixed left-1/2 transform -translate-x-1/2 bottom-0 right-au w-[480px] h-[200px] bg-white  p-4 border border-black rounded-lg "
          >
            <fieldset className="flex flex-col gap-6">
              <p className="text-center">مرتب سازی بر اساس</p>
              <div className="flex gap-4 justify-center">
                <input
                  type="radio"
                  onChange={() => handleChangeSort("rate")}
                  checked={sort === "rate"}
                />

                <p>بیشترین امتیاز</p>
              </div>
              <div className="flex gap-4 justify-center">
                <input
                  type="radio"
                  onChange={() => handleChangeSort("view")}
                  checked={sort === "view"}
                />
                <p>بیشترین بازدید</p>
              </div>
              <div className="flex gap-4 justify-center">
                <input
                  type="radio"
                  onChange={() => handleChangeSort("newest")}
                  checked={sort === "newest"}
                />
                <p> جدیدترین</p>
              </div>
            </fieldset>
          </Modal>
        </div>
        <button onClick={openModal}>مرتب سازی</button>
      </div>
      <div className="grid grid-cols-2 text-center text-sm ">
        {items.map((review: any, idx) => (
          <div key={idx} className="review-card">
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
    </div>
  );
};

export default Animations;
