import React from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import InPageNavigation from "../components/InPageNavigation";
const HomePage = () => {
  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <InPageNavigation
            routes={["Home", "Trending Blogs"]}
            defaultHidden={["Trending Blogs"]}
          >
            <h1>
              Latest Blogs
            </h1>
            <h1>Trending Blogs</h1>
          </InPageNavigation>
        </div>
        <div></div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
