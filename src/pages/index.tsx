"use client";
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
    const [content, setContent] = useState<string>('');
    const [showResult, setShowResult] = useState<boolean>(false);
    const notify = () => toast("Copied to clipboard!");
    const handleCopyCode = async () => {
        await navigator.clipboard.writeText(content);
        notify();
    }

    useEffect(() => {
        try {
            // Застосування підсвічування коду до всіх блоків <code>
            const codes: NodeListOf<HTMLPreElement> = document.querySelectorAll('pre');
            if (codes.length > 0)
                codes.forEach((block: HTMLPreElement) => {
                    hljs.highlightElement(block);
                });
        } catch (e) {
            console.error(e);
        }
    }, [content]);

    // todo: move to env or constants
    const websiteUrl: string = 'https://content-converter-hvh3-jehcc09eh-vadimchorrny.vercel.app';

    const ogImage: string = `${websiteUrl}/images/banner/banner.png`;

    return (
        <>
            <Head>
                <title>Content Converter</title>
                <meta name="description"
                      content="An enticing tool for instantly converting text into HTML: Content Converter. Edit and generate HTML effortlessly!"/>
                <link rel="icon" href="/favicon/favicon.ico"/>
                <meta property="og:image" content={ogImage}/>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:image" content={ogImage}/>
                <meta name="twitter:site" content="@byteplusplus"/>
                <meta name="twitter:creator" content="@byteplusplus"/>
                <meta name="twitter:title" content="Content Converter"/>
                <meta name="twitter:description"
                      content="An enticing tool for instantly converting text into HTML: Content Converter. Edit and generate HTML effortlessly!"/>
                <meta property="og:title" content="Content Converter"/>
                <meta property="og:description"
                      content="An enticing tool for instantly converting text into HTML: Content Converter. Edit and generate HTML effortlessly!"/>
                <meta property="og:url" content={websiteUrl}/>
                <meta property="og:type" content="website"/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:site_name" content="Content Converter"/>
            </Head>
            <h1 className={"font-bold px-5 text-center mt-24 md:text-4xl sm:text-5xl text-2xl mb-5"}>
                Content Converter -
                <span className={"text-blue-500"}>
                    {" HTML"}
                </span> Generator 📄
            </h1>
            <main
                className={`flex min-h-screen flex-col items-center ${inter.className} md:p-24 sm:p-12 p-6`}
            >
                <section className="w-full">
                    <h2 className="md:text-2xl font-bold mb-2 sm:text-3xl">
                        Enter your content
                    </h2>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
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
                    <h2 className="md:text-2xl font-bold mb-2 sm:text-3xl">
                        HTML code
                    </h2>
                    <div className={'w-full border-2 border-gray-300 p-4'}>
                        <code>
                            {content}
                        </code>
                    </div>
                    <button className={'mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}
                            disabled={!content}
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
                    {showResult && <div className={'w-full border-2 border-gray-300 p-4 mt-4 text-wrap'}
                                        dangerouslySetInnerHTML={{__html: content}}/>}
                </section>
            </main>
            <footer className={"flex flex-col justify-center items-center h-24 bg-gray-100"}>
                <div className={"text-center"}>
                    <a href={"https://vadym-chornyi-website.vercel.app"}
                       target={"_blank"} className={"hover:underline"}>
                        This website was created by Vadym Chornyi © {new Date().getFullYear()}
                    </a>
                </div>
                <div>
                    Version 1.2.0.🚀
                </div>
            </footer>
        </>
    )
}
