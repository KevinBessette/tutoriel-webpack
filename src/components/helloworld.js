import $ from 'jquery';

export default function helloworld() {
    const element = $('<div>Helloworld from Webpack</div>');
    return element;
}
