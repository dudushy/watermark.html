const TITLE = "watermark.html";
console.log(`[${TITLE}] init`);

const imageInput = document.getElementById('imageInput');
console.log(`[${TITLE}] imageInput`, imageInput);

const watermarkCanvas = document.getElementById('watermarkCanvas');
console.log(`[${TITLE}] watermarkCanvas`, watermarkCanvas);

const ctx = watermarkCanvas.getContext('2d');
console.log(`[${TITLE}] ctx`, ctx);

let image = null;
let fileName = null;
let fileExtension = null;

imageInput.addEventListener('change', handleImageUpload);
watermarkCanvas.addEventListener('click', downloadImage);

function handleImageUpload(event) {
  console.log(`[${TITLE}#handleImageUpload] event`, event);

  const file = event.target.files[0];
  console.log(`[${TITLE}#handleImageUpload] file`, file);

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();

      img.onload = function () {
        watermarkCanvas.width = img.width;
        watermarkCanvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        image = img;
      };

      img.src = e.target.result;

      fileName = file.name;
      console.log(`[${TITLE}#handleImageUpload] fileName`, fileName);

      fileExtension = fileName.split('.').pop();
      console.log(`[${TITLE}#handleImageUpload] fileExtension`, fileExtension);
    };

    reader.readAsDataURL(file);
  }
}

function downloadImage() {
  console.log(`[${TITLE}#downloadImage] image`, image);

  if (image) {
    const watermarkImage = new Image();
    watermarkImage.src = 'assets/imgs/PNGs/watermark.png';

    watermarkImage.onload = function () {
      console.log(`[${TITLE}#downloadImage] watermarkCanvas.width`, watermarkCanvas.width);
      console.log(`[${TITLE}#downloadImage] watermarkCanvas.height`, watermarkCanvas.height);

      const offset = 10;
      console.log(`[${TITLE}#downloadImage] offset`, offset);

      const watermarkWidth = watermarkCanvas.width / 4;
      console.log(`[${TITLE}#downloadImage] watermarkWidth`, watermarkWidth);

      const watermarkHeight = (watermarkWidth / watermarkImage.width) * watermarkImage.height;
      console.log(`[${TITLE}#downloadImage] watermarkHeight`, watermarkHeight);

      const watermarkX = watermarkCanvas.width - watermarkWidth - offset;
      console.log(`[${TITLE}#downloadImage] watermarkX`, watermarkX);

      const watermarkY = watermarkCanvas.height - watermarkHeight - offset;
      console.log(`[${TITLE}#downloadImage] watermarkY`, watermarkY);

      ctx.globalAlpha = 0.5;
      ctx.drawImage(watermarkImage, watermarkX, watermarkY, watermarkWidth, watermarkHeight);
      ctx.globalAlpha = 1;

      const currentDate = new Date();
      console.log(`[${TITLE}#downloadImage] currentDate`, currentDate);

      const day = String(currentDate.getDate()).padStart(2, '0');
      console.log(`[${TITLE}#downloadImage] day`, day);

      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      console.log(`[${TITLE}#downloadImage] month`, month);

      const year = currentDate.getFullYear();
      console.log(`[${TITLE}#downloadImage] year`, year);

      const hour = String(currentDate.getHours()).padStart(2, '0');
      console.log(`[${TITLE}#downloadImage] hour`, hour);

      const minute = String(currentDate.getMinutes()).padStart(2, '0');
      console.log(`[${TITLE}#downloadImage] minute`, minute);

      const second = String(currentDate.getSeconds()).padStart(2, '0');
      console.log(`[${TITLE}#downloadImage] second`, second);

      const formattedDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
      console.log(`[${TITLE}#downloadImage] formattedDate`, formattedDate);

      const responsiveCanvasUnit = Math.min(watermarkCanvas.width, watermarkCanvas.height) + Math.max(watermarkCanvas.width, watermarkCanvas.height);
      console.log(`[${TITLE}#downloadImage] responsiveCanvasUnit`, responsiveCanvasUnit);

      const fontSizeOffset = 0.0125;
      console.log(`[${TITLE}#downloadImage] fontSizeOffset`, fontSizeOffset);

      const fontSize = responsiveCanvasUnit * fontSizeOffset;
      console.log(`[${TITLE}#downloadImage] fontSize`, fontSize);

      const font = `${fontSize}px Arial`;
      console.log(`[${TITLE}#downloadImage] font`, font);

      ctx.font = font;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'right';
      ctx.fillText(formattedDate, watermarkX + watermarkWidth, watermarkY - offset);

      const newFileName = fileName.replace(`.${fileExtension}`, `-watermarked.${fileExtension}`);
      console.log(`[${TITLE}#downloadImage] newFileName`, newFileName);

      const link = document.createElement('a');
      link.download = newFileName;
      link.href = watermarkCanvas.toDataURL('image/png');
      link.click();

      ctx.clearRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);

      imageInput.value = '';
      image = null;
      fileName = null;
      fileExtension = null;
    };
  }
}
