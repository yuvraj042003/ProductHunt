import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const SortButton = ({ onChange }) => {
  const [sortOrder, setSortOrder] = useState('new'); // default: newest first

  const handleClick = () => {
    const newOrder = sortOrder === 'new' ? 'old' : 'new';
    setSortOrder(newOrder);
    onChange(newOrder);
  };

  return (
    <Button onClick={handleClick} variant="outline" className="mb-4">
      {sortOrder === 'new' ? (
        <>
          Newest First <ChevronDown className="ml-2 w-4 h-4" />
        </>
      ) : (
        <>
          Oldest First <ChevronUp className="ml-2 w-4 h-4" />
        </>
      )}
    </Button>
  );
};

export default SortButton;
