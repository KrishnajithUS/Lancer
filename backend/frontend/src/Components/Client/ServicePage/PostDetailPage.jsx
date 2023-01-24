import React from 'react';
import ContactSection from './Components/ContactSection';
import PostSection from './Components/PostSection';

function PostDetailPage({ post }) {
  // useEffect(() => {
  //   return () => {
  //     setDetailView(true);
  //   };
  // }, [setDetailView]);

  console.log(post);
  return (
    <div className="grid grid-cols-10 gap-4 ">
      <div className="md:col-span-4 col-span-full md:order-1 order-2 ml-5 mr-5 mt-5">
        <ContactSection post={post} />
      </div>
      <div className="md:col-span-6 md:order-2 order-1 col-span-full ">
        <PostSection post={post} />
      </div>
    </div>
  );
}

export default PostDetailPage;
