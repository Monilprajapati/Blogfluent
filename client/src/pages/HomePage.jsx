import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import InPageNavigation from "../components/InPageNavigation";
import { getNewBlogs, getTrendingBlogs } from "../services/blog";
import Loader from "../components/Loader";
import BlogCard from "../components/BlogCard";
import MinimalBlogCard from "../components/MinimalBlogCard";

const HomePage = () => {
  const [blogs, setBlogs] = useState(null);
  const [trendingBlogs, setTrendingBlogs] = useState(null);

  const fetchBlogs = async () => {
    const blogs = await getNewBlogs();
    setBlogs(blogs);
  };

  const fetchTrendingBlogs = async () => {
    const blogs = await getTrendingBlogs();
    setTrendingBlogs(blogs);
  };
  useEffect(() => {
    fetchBlogs();
    fetchTrendingBlogs();
  }, []);

  console.log(blogs);
  console.log(trendingBlogs)
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
            {
              trendingBlogs === null ? (
                <Loader />
              ) : (
                trendingBlogs.map((blog, index) => {
                  return (
                    <AnimationWrapper
                      key={index}
                      transition={{
                        duration: 1,
                        delay: index * 0.1,
                      }}
                    >
                      <MinimalBlogCard
                      blog={blog}
                      index={index}
                      />
                    </AnimationWrapper>
                  );
                })
              )
            
            }
          </InPageNavigation>
        </div>
        <div></div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
