import style from './Footer.module.css'

export default function Footer() {

    return (
        <footer>
            <table className={`${style.footer_table} not_mobile`}>
                <thead>
                    <tr className={`${style.first_row} u-s3`}>
                        <td>Author</td>
                        <td>Category</td>
                        <td>Made with</td>
                    </tr>
                </thead>
                <tbody className="u-p2">
                    <tr>
                        <td>Filip Miloš</td>
                        <td>Fullstack Development</td>
                        <td>React Typescript</td>
                    </tr>
                    <tr>
                        <td>May 26, 2024</td>
                        <td></td>
                        <td>Java Spring Boot</td>
                    </tr>
                </tbody>
            </table>
            <div className={`${style.columns} p2 not_desktop not_pocket`}>
                <div>
                    <p className={`${style.first_row} u-s3`}>Author</p>
                    <p>Filip Miloš</p>
                    <p>May 26, 2024</p>
                </div>
                <div>
                    <p className={`${style.first_row} u-s3`}>Category</p>
                    <p>Fullstack Development</p>
                </div>
                <div>
                    <p className={`${style.first_row} u-s3`}>Made with</p>
                    <p>React Typescript</p>
                    <p>Java Spring Boot</p>
                </div>
            </div>
            <div className={style.footer_line}></div>
            <p className={`${style.copyright} u-p3`}>Copyright &#169; 2024 All Rights Reserved Tech Talk</p>
        </footer>
    );
}