import React from "react";
import "./EditAvatar.css";

import {ReactComponent as AvatarIcon} from "../Assets/icons/avatar_icon.svg";

export default function EditAvatar() {
  return (
		<div className="edit-avatar">
			<div className="edit-avatar__image-container">
				<div className="edit-avatar__default-image">
					<AvatarIcon />
				</div>
			</div>
		</div>
	);
}
