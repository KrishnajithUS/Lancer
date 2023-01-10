import React from 'react';
import ContactSection from './Components/ContactSection';
import PostSection from './Components/PostSection';

function PostDetailPage() {
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-4 mt-5">
        <ContactSection />
      </div>
      <div className="col-span-6">
        <PostSection />
      </div>
    </div>
  );
}

export default PostDetailPage;
