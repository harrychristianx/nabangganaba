import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const MainHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-xl sm:text-2xl font-bold">
            Nabangga na ba?
          </h1>
          
          <div className="flex items-center space-x-2 md:space-x-3">
            <Button
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white w-10 h-10 md:w-auto md:h-10 md:flex md:items-center md:gap-2 md:px-4 p-0 font-medium"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="hidden md:inline">Our Discord</span>
            </Button>
            <Button
              className="bg-[#007DFE] hover:bg-[#022DB8] text-white w-10 h-10 md:w-auto md:h-10 md:flex md:items-center md:gap-2 md:px-4 p-0 font-medium"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="h-5 w-5" 
                fill="currentColor"
              >
                <path d="M12.005 19.672c1.792-.154 3.558-.896 4.867-2.18 1.309-1.284 2.082-3.037 2.271-4.826.094-.889.096-1.787.006-2.676-.09-.89-.271-1.768-.538-2.621A10.905 10.905 0 0017.306 4.5a11.144 11.144 0 00-2.14-1.767.843.843 0 00-.886-.036c-2.097 1.257-3.84 3.082-5.012 5.242a14.989 14.989 0 00-.936 2.267 9.275 9.275 0 00-.43 2.104l.907.483a22.325 22.325 0 003.196 6.879z"/>
              </svg>
              <span className="hidden md:inline">Donate GCash</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;