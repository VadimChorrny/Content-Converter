import {Inter} from 'next/font/google'
import Head from "next/head";
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import {toast} from "react-toastify";
import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';


const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});

const inter = Inter({subsets: ['latin']})

export default function Home() {
    const [value, setValue] = useState<string>('');
    const [showResult, setShowResult] = useState<boolean>(false);
    const notify = () => toast("Copied to clipboard!");
    const handleCopyCode = async () => {
        await navigator.clipboard.writeText(value);
        notify();
    }

    useEffect(() => {
        // Застосування підсвічування коду до всіх блоків <code>
        document.querySelectorAll('pre').forEach((block) => {
            hljs.highlightBlock(block as HTMLElement);
        });
    }, [value]);

    return (
        <>
            <Head>
                <title>Content Converter</title>
                <meta name="description"
                      content="An enticing tool for instantly converting text into HTML: Content Converter. Edit and generate HTML effortlessly!"/>
                <link rel="icon" href="/favicon/favicon.ico"/>
            </Head>
            <h1 className={"text-4xl font-bold text-center mt-24 "}>
                Content Converter -
                <span className={"text-blue-500"}>
                    {" HTML"}
                </span> Generator 📄
            </h1>
            <main
                className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
            >
                <section className="w-full">
                    <h2 className="text-2xl font-bold mb-2">
                        Enter your content
                    </h2>
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={{
                            toolbar: [
                                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                                [{'font': []}],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                // code-block
                                ['code-block'],
                                [{'color': []}, {'background': []}],
                                [{'script': 'sub'}, {'script': 'super'}],
                                [{'align': []}],
                                [{'indent': '-1'}, {'indent': '+1'}],
                                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                                ['link', 'image', 'video'],
                                ['clean']
                            ]
                        }}
                        placeholder="Enter your content here..."
                    />
                </section>
                <section className={`w-full mt-24 ${inter.className}`}>
                    <h2 className="text-2xl font-bold mb-2">
                        HTML code
                    </h2>
                    <div className={'w-full border-2 border-gray-300 p-4'}>
                        <code>
                            {value}
                        </code>
                    </div>
                    <button className={'mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}
                            disabled={!value}
                            onClick={handleCopyCode}>
                        Copy
                    </button>
                </section>
                <section className={`w-full mt-24 ${inter.className}`}>
                    <p>
                        <span className={'text-blue-500 cursor-pointer hover:underline'}
                              onClick={() => setShowResult(!showResult)}>
                            {showResult ? 'Hide the rendered HTML' : 'Click here to see the rendered HTML'}
                        </span>
                    </p>
                    {showResult && <div className={'w-full border-2 border-gray-300 p-4 mt-4'}
                                        dangerouslySetInnerHTML={{__html: value}}/>}
                </section>
            </main>
            <footer className={"flex justify-center items-center h-24 bg-gray-100"}>
                <div className={"text-center"}>
                    <a href={"https://vadym-chornyi-website.vercel.app"}
                       target={"_blank"} className={"hover:underline"}>
                        This website was created by Vadym Chornyi © {new Date().getFullYear()}
                    </a>
                </div>
            </footer>
        </>
    )
}
