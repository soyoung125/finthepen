import { IconSVGProps } from "@components/common/IconSVG/IconSVG.tsx";
import SocialSpriteSVG from "@assets/icons/category-sprite-sheet.svg";
import { CATEGORY_ICONS } from "@components/ScheduleList/constants.ts";

function CategoryIconSVG({ id, size }: IconSVGProps) {
  return (
    <svg fill="none" width={42} height={size}>
      <use href={`${SocialSpriteSVG}#${CATEGORY_ICONS[id]}`} />
    </svg>
  );
}

export default CategoryIconSVG;
