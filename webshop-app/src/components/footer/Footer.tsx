import style from './Footer.module.css'

export default function Footer() {
    return (
        <footer>
            <table className={style.footer_table}>
                <thead>
                    <tr className={style.gray}>
                        <td>Author</td>
                        <td>Category</td>
                        <td>Made with</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Filip Miloš</td>
                        <td>Fullstack Development</td>
                        <td>React Typescript</td>
                    </tr>
                    <tr>
                        <td>July 24, 2022</td>
                        <td></td>
                        <td>Java Spring Boot</td>
                    </tr>
                </tbody>
            </table>
            <div className={style.footer_line}></div>
                <p className={style.copyright}>Copyright &#169; 2022 All Rights Reserved Tech Talk</p>
        </footer>
    );
}