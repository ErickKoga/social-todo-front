import { NextPage } from "next";
import Link from "next/link";
import styles from "./Nav.module.css";
import { navLinks } from "./navLinks";
import * as FontAwesome from "react-icons/fa";

const Nav: NextPage = () => {
  return (
    <nav className={styles.navbar}>
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
