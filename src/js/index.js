import $ from 'jquery';
import Pusher from 'pusher-js';
import { PUSHER_KEY, SERVER_AUTH_URL } from './constants';

const pusher = new Pusher(PUSHER_KEY, {
  cluster: 'us2',
  encrypted: true,
  authEndpoint: SERVER_AUTH_URL
});
const channel = pusher.subscribe('private-tools-demo');
channel.bind('pusher:subscription_succeeded', function() {
  console.log('connected');
});

try {
  var userId = localStorage.getItem('userId');
  if (!userId) {
    userId = Math.floor(Math.random() * 100000);
    localStorage.setItem('userId', userId);
  }
} catch (e) {
  userId = Math.floor(Math.random() * 100000);
}

$(document).ready(() => {
  $('.tools').click(function(e) {
    var offset = $(this).offset();
    var relativeX = (e.pageX - offset.left);
    var relativeY = (e.pageY - offset.top);
    const payload = {
      user: userId,
      action: {
        type: 'canvas-click',
        data: {
          x: relativeX,
          y: relativeY
        }
      }
    };
    channel.trigger('client-tool-action', payload);
  });

  $('.btn').click(function(e) {
    const payload = {
      user: userId,
      action: {
        type: 'btn-click',
        data: $(this).text()
      }
    };
    channel.trigger('client-tool-action', payload);
    e.preventDefault();
    e.stopPropagation();
    return false;
  });


  channel.bind('client-tool-action', function(data) {
    console.log(data);
    $('.console pre').text(JSON.stringify(data, null, 2));
  });
});