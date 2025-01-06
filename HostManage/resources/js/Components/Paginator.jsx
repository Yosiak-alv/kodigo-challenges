import {Link} from "@inertiajs/react";

export default function Paginator({ links }) {
    if (links.length <= 1) {
        return null;
    }

    return (
        <div className="grid justify-items-center">
            <div className="flex flex-wrap mt-8">
                {links.map((link, index) => (
                    link.url === null ? (
                        <div
                            key={index}
                            className="mb-1 mr-1 px-4 py-3 leading-tight border border-gray-200 text-gray-500 rounded"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        <Link
                            key={index}
                            href={link.url || ''}
                            className={`mb-1 mr-1 px-4 py-3 leading-tight border border-gray-200 text-gray-500 hover:bg-gray-100 rounded ${
                                link.active ? "bg-gray-200" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            preserveScroll
                        />
                    )
                ))}
            </div>
        </div>
    );
}
