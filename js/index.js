/**
 * index.js
 * @author Seasand-yyh
 * @date 2022-06-10
 */
var DATA_PATH = './data.json';

function init() {
  var data = load_data(DATA_PATH);
  init_view('#content-wrapper', data);
}

/**
 * load_data
 * @param  [string] path
 * @return [array]
 */
function load_data(path) {
  var data = [];
  if(!path)
    return data;
  $.ajax({
    'url': path,
    'async': false,
    'dataType': 'json',
    success: function(result) {
      if(typeof(result) == 'object' && result instanceof Array) {
        data = result;
      }
    },
    error: function(e) {
      alert('Opps! can not load [' + path + ']!');
      console.error('Opps! can not load [' + path + ']!', e);
    }
  });
  return data;
}

/**
 * init_view
 * @param  [obj] ctx
 * @param  [array] datalist
 * @return [void]
 */
function init_view(ctx, datalist) {
  if(!datalist)
    return;
  var template = datalist.map(render_view);
  $(ctx).html(template.join(''));
}

/**
 * render_view
 * @param  [obj] data
 * @return [string]
 */
function render_view(data) {
  if(!data)
    return '';
  var name = data.name;
  var path = data.path;
  var addr = get_base_path() + '/' + path;
  var template = '<li class="list-group-item ck-link"><a href="' + addr + '" title="' + name + '" target="_BLANK">' + name + '</a></li>';
  return template;
}

/**
 * get_base_path
 * @return [string]
 */
function get_base_path() {
  var href = window.location.href;
  var pos = href.lastIndexOf('index.html');
  return pos >= 0 ? href.substring(0, pos) : href;
}
