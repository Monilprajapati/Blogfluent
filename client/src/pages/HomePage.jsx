import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import InPageNavigation from "../components/InPageNavigation";
import { getNewBlogs, getTrendingBlogs } from "../services/blog";
import Loader from "../components/Loader";
import BlogCard from "../components/BlogCard";
import MinimalBlogCard from "../components/MinimalBlogCard";
import { TbTrendingUp } from "react-icons/tb";

const HomePage = () => {
  const [blogs, setBlogs] = useState(null);
  const [trendingBlogs, setTrendingBlogs] = useState(null);

  const categories = [
    "Finance",
    "Tech",
    "Course",
    "Admin",
    "Project",
    "Hackathon",
    "Learning",
    "Development",
    "Design",
    "Teaching",
  ];

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
  console.log(trendingBlogs);
  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10 xl:gap-20">
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
            {trendingBlogs === null ? (
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
                    <MinimalBlogCard blog={blog} index={index} />
                  </AnimationWrapper>
                );
              })
            )}
          </InPageNavigation>
        </div>
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min md:border-l border-grey pl-8 hidden md:block">
          <div className="flex flex-col gap-5 mb-6">
            <h1 className="font-medium text-xl">Find your interest through tags</h1>
            <dir className="flex gap-3 flex-wrap">
              {categories.map((category, index) => {
                return (
                  <button key={index} className="tag">
                    {category}
                  </button>
                );
              })}
            </dir>
          </div>

          <div className="">
            <h1 className="flex items-center gap-2 mb-8">
              <span className="font-medium text-xl">Trending Blogs</span>
              <TbTrendingUp className="text-2xl mr-2" />
            </h1>
            <div>
              {trendingBlogs === null ? (
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
                      <MinimalBlogCard blog={blog} index={index} />
                    </AnimationWrapper>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
