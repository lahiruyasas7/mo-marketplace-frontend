interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const ProductPagination = ({ page, totalPages, onChange }: Props) => {
  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
      >
        Prev
      </button>

      <span className="px-3 py-1">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default ProductPagination;
