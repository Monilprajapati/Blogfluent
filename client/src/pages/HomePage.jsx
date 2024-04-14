import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import InPageNavigation from "../components/InPageNavigation";
import { getNewBlogs } from "../services/blog";
import Loader from "../components/Loader";
import BlogCard from "../components/BlogCard";

const HomePage = () => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getNewBlogs();
      setBlogs(blogs);
    };

    fetchBlogs();
  }, []);

  console.log(blogs);
  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <InPageNavigation
            routes={["Home", "Trending Blogs"]}
            defaultHidden={["Trending Blogs"]}
          >
            <>
              {blogs === null ? (
                <Loader />
              ) : (
                blogs.map((blog, index) => {
                  return (
                    <AnimationWrapper
                      key={index}
                      transition={{
                        duration: 1,
                        delay: index * 0.1,
                      }}
                    >
                      <BlogCard
                        content={blog}
                        author={blog.author.personal_info}
                      />
                    </AnimationWrapper>
                  );
                })
              )}
            </>
            <h1>Trending Blogs</h1>
          </InPageNavigation>
        </div>
        <div></div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
