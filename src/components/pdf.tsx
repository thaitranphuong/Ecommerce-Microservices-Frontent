import { jsPDF } from 'jspdf';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import EditImport from '~/app/admin/edit-import/[id]/page';
import ExportImport from './export-import/page';

function Pdf({ importId }: { importId: string }) {
    const generatePDF = () => {
        const input: any = document.getElementById('pdf-element');
        input.style = 'display: block';

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pageWidth = 210; // Chiều rộng A4 (mm)
            const pageHeight = 297; // Chiều cao A4 (mm)
            const imgWidth = pageWidth;

            // Chiều cao của hình ảnh dựa trên tỷ lệ chiều rộng
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            // Trang đầu tiên
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Tạo các trang tiếp theo nếu còn phần nội dung
            while (heightLeft > 0) {
                position = heightLeft - imgHeight; // Vị trí hiện tại
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Lưu file PDF
            pdf.save('document.pdf');
        });

        input.style = 'display: none';
    };

    return (
        <div>
            <div id="pdf-element" style={{ display: 'none' }}>
                <ExportImport params={{ id: importId }} />
            </div>
            <button
                className="flex items-center border-solid border-[2px] border-[#DB0001] p-2 mr-2 rounded-sm text-[#DB0001]"
                onClick={generatePDF}
            >
                <Image className="w-[30px]" src={'/images/pdf.png'} width={100} height={100} alt="" />
                Export PDF
            </button>
        </div>
    );
}

export default Pdf;
