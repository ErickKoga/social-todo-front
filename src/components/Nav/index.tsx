import Link from "next/link";
import styles from "./Nav.module.css";
import { navLinks } from "./navLinks";
import * as FontAwesome from "react-icons/fa";
import logo from "../../assets/logo.svg";
import Image from "next/image";

const Nav: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src={logo} alt="logo" width="100" />
      </div>
      <ul>
        {navLinks.map((link, index) => {
          const Icon = FontAwesome[link.navIcon as keyof typeof FontAwesome];
          return (
            <Link key={index} href={link.navPath}>
              <li>
                <Icon className={styles.navIcon} />
                {link.navDescription}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};
export default Nav;
