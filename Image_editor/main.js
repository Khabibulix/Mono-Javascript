const file_input = document.querySelector("#file-input"),
filter_name = document.querySelector("#name_of_filter"),
filter_slider = document.querySelector("#slider input"),
filter_value = document.querySelector("#value_of_filter"),
filter_options = document.querySelectorAll("#filter_options button"),
rotate_options = document.querySelectorAll("#rotate_options button"),
choose_image_button = document.querySelector("#choose-img"),
save_image_button = document.querySelector("#save-img"),
reset_filters_button = document.querySelector("#reset-filter"),
preview_image = document.querySelector("#preview-img img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0; flip_horizontally = 1; flip_vertically = 1;

const apply_rotation = () => {    
    preview_image.style.transform = 'rotate('+rotate+'deg) scale('+flip_horizontally+','+flip_vertically+') ';
}

const apply_filters = () => {
    preview_image.style.filter = 'brightness('+brightness+'%) saturate('+saturation+'%) invert('+inversion+'%) grayscale('+grayscale+'%)';
}

const loadImage = () => {
    let file = file_input.files[0]; //grabbing file here
    if(!file) return;
    preview_image.src = URL.createObjectURL(file);
    preview_image.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    });
}

filter_options.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector("#filter_options .active").classList.remove("active");
        option.classList.add("active");
        filter_name.innerText = option.innerText;

        if(option.id === "brightness"){
            filter_slider.max = "200";
            filter_slider.value = brightness;
            filter_value.innerText = brightness+"%";
        } else if(option.id === "saturation"){
            filter_slider.max = "200";
            filter_slider.value = saturation;
            filter_value.innerText = saturation+"%";
        } else if(option.id === "inversion"){
            filter_slider.max = "100";
            filter_slider.value = inversion;
            filter_value.innerText = inversion+"%";
        } else {
            filter_slider.max = "100";
            filter_slider.value = grayscale;
            filter_value.innerText = grayscale+"%";
        }
    });
});

const update_filter = () => {
    filter_value.innerText = filter_slider.value +"%";
    const selected_filter = document.querySelector("#filter .active")

    if(selected_filter.id === "brightness"){
        brightness = filter_slider.value;
    } else if(selected_filter.id === "saturation"){
        saturation = filter_slider.value
    } else if(selected_filter.id === "inversion"){
        inversion = filter_slider.value
    } else {
        grayscale = filter_slider.value
    }

    apply_filters()
}

rotate_options.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left"){
            rotate -= 90;
        } else if(option.id === "right"){
            rotate += 90;
        } else if(option.id === "horizontal"){
            flip_horizontally = flip_horizontally === 1 ? -1 : 1;
        } else {            
            flip_vertically = flip_vertically === 1 ? -1 : 1;
        }
        apply_rotation();
    });
});

const reset_filter = () => {
    brightness = 100; saturation = 100; inversion = 100; grayscale = 100;
    rotate = 0; flip_horizontally = 1; flip_vertically = 1;
    apply_filters()
};

const save_image = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = preview_image.naturalWidth;
    canvas.height = preview_image.naturalHeight;

    ctx.translate(canvas.width / 2, canvas.height / 2)
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.filter = 'brightness('+brightness+'%) saturate('+saturation+'%) invert('+inversion+'%) grayscale('+grayscale+'%)';
    ctx.scale(flip_horizontally, flip_vertically);
    ctx.drawImage(preview_image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
};

file_input.addEventListener("change", loadImage);
filter_slider.addEventListener("input", update_filter);
reset_filters_button.addEventListener("click", reset_filter);
save_image_button.addEventListener("click", save_image);
choose_image_button.addEventListener("click", () => file_input.click())