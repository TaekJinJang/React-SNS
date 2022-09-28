import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function PostCardContent({ postData }) {
  // 첫번째 게시글 #해시태그 #익스프레스 #해시태그 잡기
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, index) => {
        if (v.match(/(#[^\s#]+)/g)) {
          return (
            <Link href="/hashtag/${v.slice(1)}" key={index}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
}

PostCardContent.propTypes = { postData: PropTypes.string.isRequired };

export default PostCardContent;
