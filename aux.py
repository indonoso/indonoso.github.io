import json

with open('cv_info.json') as file:
    cv = json.load(file)

cv = cv['en']

print('\section{Research}\n \\begin{entrylist}')

order = ['dates', 'what', 'where', 'activities']

for item in cv['research_experience'][::-1]:
    print('\entry')
    for o in order:
        print('\t{' + item[o] + '}')
print('\end{entrylist}')

print('\section{Work Experience}\n \\begin{entrylist}')

order = ['dates', 'what', 'where', 'city', 'activities']

for item in cv['working_experience'][::-1]:
    print('\entry')
    for o in order:
        print('\t{' + item[o] + '}')

print('\end{entrylist}')

print('\section{Education}\n \\begin{entrylist}')
order = ['dates', 'what', 'where', 'city', 'relevant_classes']

for item in cv['education'][::-1]:
    print('\entry')
    for o in order:
        if o == 'relevant_classes':
            print('\t{Relevant classes: ' + item[o] + '}')
        else:
            print('\t{' + item[o] + '}')
print('\end{entrylist}')

print('\section{Teaching Experience}\n \\begin{entrylist}')
order = ['dates', 'what', 'where', 'city', 'bullet_points']

for item in cv['teaching_experience'][::-1]:
    print('\entry')
    for o in order:
        if o == 'bullet_points':
            print('\t{Courses: ' + ', '.join(item[o]) + '}')
        else:
            print('\t{' + item[o] + '}')
print('\end{entrylist}')

print('\section{Other Activities}\n \\begin{entrylist}')
order = ['dates', 'what', 'where', 'city']

for item in cv['other_activities'][::-1]:
    print('\entry')
    for o in order:
        print('\t{' + item[o] + '}')
print('\end{entrylist}')