import React from "react";
import { Button } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

const ShareButton = ({ product }) => {
  const shareUrl = `${window.location.origin}/product/${product.id}`;
  const shareText = `${product.name} - ${product.model}\n${product.description.substring(0, 100)}...\n${shareUrl}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <Button variant="contained" color="primary" startIcon={<ShareIcon />} onClick={handleShare}>
      Share
    </Button>
  );
};

export default ShareButton;
