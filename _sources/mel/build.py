import json
exec(open('places.py').read())
cats=[{"id":c[0],"name":c[1],"intro":c[2],"color":c[3]} for c in CATS]
pl=[{"n":p[0],"cat":p[1],"name":p[2],"tag":p[3],"desc":p[4],"lat":p[5],"lon":p[6],"wiki":p[7]} for p in P]
html=open('template.html').read().replace('/*DATA*/','const CATS='+json.dumps(cats,ensure_ascii=False)+';\nconst PLACES='+json.dumps(pl,ensure_ascii=False)+';')
open('/home/claude/olllvier/guide-istanbul/melbourne.html','w').write(html)
print('ok',len(pl))
