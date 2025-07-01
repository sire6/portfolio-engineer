import React from "react";
import "./SoftwareSkill.scss";
import { skillsSection } from "../../portfolio";
import { SiNvidia, SiDocker, SiTensorflow, SiPytorch, SiFfmpeg, SiApachekafka, SiApacheflink } from "react-icons/si";
import { FaMicrochip, FaVideo, FaThermometerHalf, FaTools, FaEye } from "react-icons/fa";

const iconMap = {
  SiNvidia: SiNvidia,
  SiDocker: SiDocker,
  SiTensorflow: SiTensorflow,
  SiPytorch: SiPytorch,
  SiFfmpeg: SiFfmpeg,
  SiApachekafka: SiApachekafka,
  SiApacheflink: SiApacheflink,
  FaMicrochip: FaMicrochip,
  FaVideo: FaVideo,
  FaThermometerHalf: FaThermometerHalf,
  FaTools: FaTools,
  FaEye: FaEye
};

export default function SoftwareSkill() {
  return (
    <div>
      <div className="software-skills-main-div">
        <ul className="dev-icons">
          {skillsSection.softwareSkills.map((skills, i) => {
            const IconComponent = iconMap[skills.reactIcon];
            return (
              <li
                key={i}
                className="software-skill-inline"
                name={skills.skillName}
              >
                {IconComponent ? <IconComponent size={40} /> : null}
                <p>{skills.skillName}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
