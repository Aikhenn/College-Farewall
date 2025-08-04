"use client";


import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Masonry from 'react-masonry-css';


import Image from "next/image";
import { useState } from "react";
import DialogBox from "@/components/dialog/AddDialog";

type ReactionMap = {
  [emoji: string]: number;
};

interface Post {
  id: number;
  image: string;
  content: string;
  from: string;
  reactions: ReactionMap;
}

export default function Home() {
  const  [isDialogOpen, setIsDialogOpen] = useState(false);

const REACTIONS = ["❤️", "😂", "👏", "😢", "🔥"];

  const breakpointColumnsObj = {
    default: 4,
    1024: 4,
    768: 3,
    0: 2
  };

  const [posts, setPosts] = useState<Post[]> ([
    {
      id: 1,
      image: "https://placehold.co/600x300/000000/FFFFFF/png",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      from: "From Aikhen",
      reactions: {
        "❤️": 5,
        "😂": 2,
        "👏": 1,
      },

    },
    {
      id: 2,
      image: "https://placehold.co/200x300/111111/FFFFFF/png",
      content: "Ut enim ad minim veniam, quis nostrud exercitation...",
      from: "From Kai",
      reactions: {},
    },
    {
      id: 3,
      image: "https://placehold.co/400x300/222222/FFFFFF/png",
      content: "Duis aute irure dolor in reprehenderit in voluptate...",
      from: "From Eli",
      reactions: {},
    },
    {
      id: 4,
      image: "https://placehold.co/600x300/333333/FFFFFF/png",
      content: "Excepteur sint odawdawddawdwadccaecat cupidatat non proident...",
      from: "From Sam",
      reactions: {},
    },
     {
      id: 5,
      image: "https://placehold.co/400x300/333333/FFFFFF/png",
      content: "Excepteur sint odawdawddawdwadccaecat cupidatat non proident...",
      from: "From Sam",
      reactions: {},
    },
     {
      id: 6,
      image: "https://placehold.co/400x300/333333/FFFFFF/png",
      content: "Excepteur sint odawdawddawdwadccaecat cupidatat non proident...",
      from: "From Sam",
      reactions: {},
    },
     {
      id: 7,
      image: "https://placehold.co/400x300/333333/FFFFFF/png",
      content: "Excepteur sint odawdawddawdwadccaecat cupidatat non proident...",
      from: "From Sam",
      reactions: {},

    },
     {
      id: 8,
      image: "https://placehold.co/400x300/333333/FFFFFF/png",
      content: "Excepteur sint odawdawddawdwadccaecat cupidatat non proident...",
      from: "From Sam",
      reactions: {},
    },
    // add more as needed
  ]);

  const handleReaction = (postId: number, emoji: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              reactions: {
                ...post.reactions,
                [emoji]: (post.reactions[emoji] || 0) + 1,
              },
            }
          : post
      )
    );
  };

  return (
    <div className="font-sansitems-center  min-h-screen  pb-2 border-4 border-red-400 p-8">
      <div className="absolute top-20 left-5">
        <Button 
          variant="outline" 
          className="text-2xl"
          onClick={() => setIsDialogOpen(true)}
        >
          +
        </Button>

      </div>


      <main className="relative flex items-center mb-10  flex-col z-0">
      <h1 className="text-4xl font-extrabold mb-10">COLLEGE APPRECIATION WALL!</h1>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="relative z-10 flex gap-6 overflow-visible"
          columnClassName="flex flex-col gap-6 overflow-visible"
        >
      {posts.map((post) => (
        <Card key={post.id} className=" relative pb-1 drop-shadow-2xl z-0 overflow-visible">
          <CardContent className="relative p-0 max-w-100 flex flex-col items-center  z-0">
            <Image src={post.image} alt="Image" width={400} height={300} />
            <p className="p-2 mt-3">{post.content}</p>
          </CardContent>


      
          <CardFooter className="relative flex flex-col items-end self-end z-10 mb-3">
            <p>{post.from}</p>
                {/* Reaction Button Group */}


            <div className="flex self-end relative left-3 gap-1 z-10">

                {/* Show all reactions */}
              {post.reactions && Object.entries(post.reactions).length > 0 && (
                <div className="flex flex-wrap gap-1 mt-5">
                  {Object.entries(post.reactions).map(([emoji, count]) => (
                    <div
                      key={emoji}
                      className="bg-gray-200 px-2 py-0  rounded-xl text-sm flex items-center gap-1"
                    >
                      <span className="text-sm">{emoji}</span>
                      <span>{count}</span>
                    </div>
                  ))}
                </div>
              )}

               {/* Trigger Icon */}
              <div className="relative z-20 group flex items-center justify-end bg-gray-200 p-1.5 px-2.5 rounded-xl mt-5">
                <div className="relative z-50 group ">
            
                  <button className="text-xl transition opacity-80">
                    <i className="fi fi-sr-smile-plus"></i>
                  </button>

                  {/* Emoji Options (hover reveal) */}
                  <div className="absolute bottom-[-30px] text-2xl right-[-12px] mb-[-10px]  
                  hidden group-hover:flex bg-white shadow-md rounded-full px-3 py-1 gap-2 z-50">
                   {REACTIONS.map((emoji) =>(
                    <button
                        key={emoji}
                        onClick={() => handleReaction(post.id, emoji)}
                        className="hover:scale-110 transition text-2xl"
                    >
                      {emoji}
                    </button>
                   ))}
                  </div>

                </div>
              </div>

            </div>

          </CardFooter>
        </Card>
      ))}
    </Masonry>

      <DialogBox isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
