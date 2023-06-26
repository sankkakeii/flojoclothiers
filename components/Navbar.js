import Link from 'next/link';

function Navbar() {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/">
                    <div className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FlojoClothiers</span>
                    </div>
                </Link>
                {/* omitting toggle button for brevity */}
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href="/_settings/settings">
                                <div className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">Settings</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
