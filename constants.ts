
import { Category } from './types';

export const CATEGORY_PROMPTS: Record<Category, string> = {
  [Category.Travel]:
    "Analyze the provided image and write an engaging travel narrative. Describe the scenic elements, potential activities, and the overall atmosphere of the location. The tone should be inspiring and adventurous, making the reader want to visit.",
  [Category.RealEstate]:
    "Generate a detailed and compelling real estate listing description for the property in this image. Focus on architectural style, interior features, outdoor spaces, and any recent upgrades. Incorporate relevant SEO keywords naturally (location-based, property features, popular amenities). Use emotive language to help potential buyers visualize themselves in the space. Tailor the description to a likely target buyer demographic, complement what's visible in the photo, and end with a strong call to action. Prioritize accuracy and clarity.",
  [Category.Ecommerce]:
    "Write a persuasive e-commerce product description for the item in this image. Highlight its key features, materials, and design. Emphasize the benefits for the customer and explain how it solves a problem or enhances their life. The tone should be professional yet enticing, aiming to convert browsers into buyers.",
  [Category.Food]:
    "Craft a descriptive food blog post based on this image. Detail the dish's appearance, textures, and potential flavor profile. Use vivid and sensory language to evoke taste and smell. Suggest perfect pairings or occasions for enjoying the dish. The style should be mouth-watering and engaging for food enthusiasts.",
};
