import React from "react";
import { Button } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useLanguage } from "../contexts/LanguageContext";

const ShareButton = ({ product }) => {
  const shareUrl = `${window.location.origin}/product/${product.id}`;
  const shareText = `${product.name} - ${
    product.model
  }\n${product.description.substring(0, 100)}...\n${shareUrl}`;
  const { t } = useLanguage();
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
      alert(t("linkCopied"));
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<ShareIcon />}
      onClick={handleShare}
    >
      Share
    </Button>
  );
};

export default ShareButton;
