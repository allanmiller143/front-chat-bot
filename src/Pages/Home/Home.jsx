import React from "react";
import LgBox from "../../Components/LgBox";
import Header from "../../Components/Header/Header";
import HomeBanner from "./Components/HomeBanner";
import PageContainer from "../../Components/PageContainer";

const Home = () => {
  return (
      <PageContainer>
      <Header/>
          <HomeBanner/>
      </PageContainer>
  );
};

export default Home;
