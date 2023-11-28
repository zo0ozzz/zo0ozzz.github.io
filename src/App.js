import "./App.scss";
import { useState, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import {
  HOME_PAGE,
  CATEGORY_PAGE,
  SEARCH_PAGE,
  POST_VIEW_PAGE,
  POST_EDIT_PAGE,
  POST_CREATE_PAGE,
  GOD_PAGE,
} from "./URL";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Home from "./pages/home/Home";
import Category from "./pages/category/Category";
import Search from "./pages/search/Search";
import Post from "./pages/post/Post";
import God from "./pages/god/God";
import Test from "./pages/test/Test";
import Login from "./pages/login/Login";

function App() {
  const [blogName, setBlogName] = useState("");
  const sortingMedthodData = [
    {
      id: 0,
      value: "최신순",
      name: "최신순",
      sortingFunc: (posts) => [...posts].sort((a, b) => b.number - a.number),
    },
    {
      id: 1,
      value: "오래된 순",
      name: "오래된 순",
      sortingFunc: (posts) => [...posts].sort((a, b) => a.number - b.number),
    },
  ];

  const [selectedSortingMedthod, setSelectedSortingMedthod] = useState(
    sortingMedthodData[0].value
  );

  const [categoryData, setCategoryData] = useState([{}]);
  const [representativeCategoryName, setRepresentativeCategoryName] =
    useState("");
  const [isGod, setIsGod] = useState(false);
  console.log(isGod);

  useEffect(() => {
    if (categoryData.length === 1) return;
    // - 카테고리데이터가 업데이트 되지 않으면 아무 동작도 하지 않음.

    const representativeCategoryName = categoryData.find(
      // - 카테고리 데이터가 업데이트 되면
      // - 대표 카테고리를 찾아(isRe... === true) 저장.
      (item) => item.isRepresentative === true
    ).name;
    setRepresentativeCategoryName((prev) => representativeCategoryName);
  }, [categoryData]);

  return (
    <>
      <div className="wrapper">
        <Header
          blogName={blogName}
          setBlogName={setBlogName}
          isGod={isGod}
          setIsGod={setIsGod}
        />
        <Routes>
          <Route
            path={HOME_PAGE}
            element={
              <>
                <Home
                  sortingMedthodData={sortingMedthodData}
                  selectedSortingMedthod={selectedSortingMedthod}
                  setSelectedSortingMedthod={setSelectedSortingMedthod}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                  representativeCategoryName={representativeCategoryName}
                />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login isGod={isGod} setIsGod={setIsGod} />
              </>
            }
          />
          <Route
            path={CATEGORY_PAGE(":selectedCategory")}
            element={
              <>
                <Category
                  selectedSortingMedthod={selectedSortingMedthod}
                  setSelectedSortingMedthod={setSelectedSortingMedthod}
                  sortingMedthodData={sortingMedthodData}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={SEARCH_PAGE}
            element={
              <>
                <Search
                  selectedSortingMedthod={selectedSortingMedthod}
                  setSelectedSortingMedthod={setSelectedSortingMedthod}
                  sortingMedthodData={sortingMedthodData}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={POST_VIEW_PAGE(":_id")}
            element={
              <>
                <Post
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                  isGod={isGod}
                />
              </>
            }
          />
          <Route
            path={POST_EDIT_PAGE(":_id")}
            element={
              <>
                <Post
                  mode={"edit"}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={POST_CREATE_PAGE}
            element={
              <>
                <Post
                  mode={"create"}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={GOD_PAGE}
            element={
              <>
                <God
                  blogName={blogName}
                  setBlogName={setBlogName}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={"/test"}
            element={
              <>
                <Test />
              </>
            }
          />
        </Routes>
        <div className="empty"></div>
        <Footer />
      </div>
    </>
  );
}

export default App;
