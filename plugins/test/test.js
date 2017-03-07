exports.commands = [
	"rule34"
];

exports.rule34 = {
  usage: 'rule34',
  description: 'Rule#34 : If it exists there is porn of it. If not, start uploading.',
  process: function (bot,msg,suffix) {
    msg.channel.sendTyping()
    unirest.post('http://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + suffix) // Fetching 100 rule34 pics
      .end(function (result) {
        var xml2js = require('xml2js')
        if (result.body.length < 75) {
          msg.reply('sorry, nothing found.') // Correct me if it's wrong.
        } else {
          xml2js.parseString(result.body, (err, reply) => {
            if (err) {
              msg.channel.sendMessage('The API returned an unconventional response.')
            } else {
              var count = Math.floor((Math.random() * reply.posts.post.length))
              var FurryArray = []
              if (!suffix) {
                FurryArray.push(msg.author.mention + ", you've searched for `random`")
              } else {
                FurryArray.push(msg.author.mention + ", you've searched for `" + suffix + '`')
              }
              FurryArray.push('http:' + reply.posts.post[count].$.file_url)
              msg.channel.sendMessage(FurryArray.join('\n'))
            }
          })
        }
      })
  }
}