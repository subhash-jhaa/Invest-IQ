import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBookmark,
  FiSearch,
  FiInfo,
  FiLoader,
  FiX,
  FiClock,
  FiTrendingUp,
  FiFilter,
} from "react-icons/fi";
import { blogBrainExplain } from "../services/gemini";
import { financeBlogs } from "../data/financeBlogs";
import { useChatbot } from "../context/ChatBotContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Optional: supports GitHub Flavored Markdown

export default function BlogsSection() {
  const [search, setSearch] = useState("");
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [explainedTerm, setExplainedTerm] = useState("");
  const [explanation, setExplanation] = useState("");
  const [explainLoading, setExplainLoading] = useState(false);
  const { openWithMessage } = useChatbot();
  const [selectedTag, setSelectedTag] = useState("");
  const [featuredBlog, setFeaturedBlog] = useState(null);

  useEffect(() => {
    const featured = financeBlogs.reduce((prev, current) =>
      (current.engagement || 0) > (prev?.engagement || 0) ? current : prev
    );
    setFeaturedBlog(featured);
  }, []);

  const allTags = [...new Set(financeBlogs.flatMap((blog) => blog.tags))];

  const toggleSave = (id) => {
    setSavedBlogs((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleExplain = async (blog) => {
    setExplainedTerm(blog.title);
    setExplainLoading(true);
    setExplanation("");

    try {
      const result = await blogBrainExplain(blog.title, blog.summary); // use new function
      setExplanation(
        result.success
          ? result.explanation
          : `Sorry, I couldn't explain "${blog.title}" right now.`
      );
    } catch (error) {
      console.error("Brain explanation error:", error);
      setExplanation(`Sorry, I couldn't explain "${blog.title}" right now.`);
    } finally {
      setExplainLoading(false);
    }
  };

  const filteredBlogs = financeBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Finance Blogs for Beginners
      </motion.h2>

      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search articles by topic or tags..." // Updated placeholder
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
        />
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredBlogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4">{blog.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                    >
                      {tag.replace(/^#/, "")} {/* Remove hash from tags */}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mt-auto pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleExplain(blog)}
                  className="text-xs text-black bg-gray-100 cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-lg"
                >
                  🧠 Brain
                </button>

                <button
                  onClick={() =>
                    openWithMessage(
                      `Hi InvestIQ, I was reading "${blog.title}" and here's the summary:\n"${blog.summary}". Can you explain it further?`
                    )
                  }
                  className="text-xs text-white bg-emerald-500 cursor-pointer hover:bg-emerald-400 px-4 py-2 rounded-lg"
                >
                  🤖 Ask InvestIQ AI
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {filteredBlogs.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No blogs match that tag.
        </p>
      )}

      {explainedTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md px-4 sm:px-0">
          <div className="relative w-full max-w-3xl max-h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                  <FiInfo className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  Understanding: {explainedTerm}
                </h3>
              </div>
              <button
                onClick={() => {
                  setExplainedTerm("");
                  setExplanation("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Markdown Content */}
            <div className="overflow-y-auto px-5 py-4 flex-1 text-sm sm:text-base text-gray-700 leading-relaxed prose prose-sm sm:prose-base max-w-none">
              {explainLoading ? (
                <div className="text-center py-6">
                  <FiLoader className="w-6 h-6 text-emerald-500 mx-auto mb-2 animate-spin" />
                  <p className="text-gray-500">Getting explanation...</p>
                </div>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {explanation}
                </ReactMarkdown>
              )}
            </div>

            {/* Footer */}
            <div className="border-t px-5 py-4 text-right">
              <button
                onClick={() => {
                  setExplainedTerm("");
                  setExplanation("");
                }}
                className="px-4 py-2 text-sm sm:text-base bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
